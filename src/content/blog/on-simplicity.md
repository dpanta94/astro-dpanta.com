---
title: On Simplicity
date: 2026-03-10
description: When abstraction helps and when it just gets in the way. Thoughts on keeping code simple without being lazy about it.
tags:
  - development
  - thoughts
---

I think the solution should be as simple as possible. That's not a controversial opinion, everyone says it. But what people mean by "simple" varies a lot, and that's where it gets interesting.

Adding complexity is adding problems to solve. Sometimes you need that. Maintainability, extensibility, developer experience, these are real reasons to add complexity. They're close to my heart, actually. I want the code I ship to be easy to maintain, easy to extend, and when it's aimed at developers, I want them to have a good experience working with it.

But abstraction should earn its place. It should provide real value, not just satisfy a pattern you read about.

## The abstraction question

I've asked myself this many times while reading code: why does this have its own class?

Say you have a class that needs to obfuscate a UUID. The obfuscation itself is just a `preg_replace` call. Nothing fancy.

Here's the simple version, a private method:

```php
final readonly class UserProfile
{
    public function __construct(
        private UserRepository $users,
    ) {}

    public function getPublicData( int $user_id ): array {
        $user = $this->users->find( $user_id );

        return [
            'name'    => $user->name,
            'token'   => $this->obfuscate( $user->token ),
            'api_key' => $this->obfuscate( $user->api_key ),
        ];
    }

    private function obfuscate( string $uuid ): string {
        return preg_replace(
            '/^([a-f0-9]{8})-([a-f0-9]{4})-/',
            '********-****-',
            $uuid
        );
    }
}
```

You read that and you immediately know what `obfuscate` does. It's right there. You don't need to open another file, check a service container binding, or trace through an interface. The method is private, so nothing outside this class depends on it. If you need to change the pattern tomorrow, you change it in one place and you're done.

Now here's the version with an injectable service:

```php
// You have an interface for the obfuscator
interface ObfuscatorInterface
{
    public function obfuscate( string $uuid ): string;
}

// Here is an implementation of the obfuscator
final readonly class Obfuscator implements ObfuscatorInterface
{
    public function obfuscate( string $uuid ): string {
        return preg_replace(
            '/^([a-f0-9]{8})-([a-f0-9]{4})-/',
            '********-****-',
            $uuid
        );
    }
}

// Somewhere else in your codebase where you are doing container
// bindings, you make sure that wherever a ObfuscatorInterface is
// expected, you inject an Obfuscator instance.
$container->bind( ObfuscatorInterface::class, Obfuscator::class );

// And here you have your UserProfile class which your container will
// instantiate and inject the ObfuscatorInterface implementation into
// aka your Obfuscator class.
final readonly class UserProfile
{
    public function __construct(
        private UserRepository $users,
        private ObfuscatorInterface $obfuscator,
    ) {}

    public function getPublicData( int $user_id ): array {
        $user = $this->users->find( $user_id );

        return [
            'name'    => $user->name,
            'token'   => $this->obfuscator->obfuscate( $user->token ),
            'api_key' => $this->obfuscator->obfuscate( $user->api_key ),
        ];
    }
}
```

More files, more constructor arguments, more indirection. For what? A `preg_replace` that only this class uses.

If you're obfuscating UUIDs in one place, the private method is the right call. Inline it. Make it visible. Keep it close to where it's used.

## When abstraction earns its place

But say next month you need to obfuscate UUIDs in your API responses, in your export module, in your audit logs. Now that same `preg_replace` lives in three different classes as three different private methods. Change the pattern and you have to find all three. Miss one and you have inconsistent obfuscation.

That's when the `Obfuscator` service starts making sense. Not because it's more "proper," but because you actually need a single source of truth. The abstraction has a job now.

## The rule I try to follow

Don't abstract for the sake of abstraction. Don't create a class because a class "should" exist there. Write the simple version first. If it stays in one place, leave it there. If it starts showing up elsewhere, then pull it out.

Three similar lines of code are better than a premature abstraction. And code you can read without jumping between files is code you can fix at 2am when something breaks.
