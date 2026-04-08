---
title: What maintaining a plugin used by almost a million taught me
date: 2026-03-20
description: Lessons from working on The Events Calendar, a WordPress plugin running on over 800,000 sites. Backwards compatibility, database migrations, and the weight of a bad release.
image: ../../assets/images/maintaining-a-plugin-used-by-almost-a-million.png
tags:
  - development
  - wordpress
---

I've been working on The Events Calendar at StellarWP for a while now. It's a family of products which are mostly WordPress plugins installed on over 800,000 sites. Here's what that taught me.

## Everything non-private is a contract

This was one of the biggest lessons. It goes beyond just hooks.

Every public method is a contract. Every protected method on a non-final class is a contract, because someone out there can extend your class and override it. Every hook, every constant, every function you expose, every meta key you are using to store data. Once it's out there, people might build on it.

You can't just swap a method for a better one. You deprecate the old one and redirect it to the new one. You keep the old signature working. You do this for functions, methods, hooks, all of it. And whole classes? You can't just deprecate those either, because integrations out there may be using them directly.

Communication becomes a real part of the release cycle. Every release needs a clear list of what's been deprecated, so that maintainers of third-party integrations know what they need to update on their end. Skip that communication and you're breaking other people's products without warning.

I've learned to think twice before making anything public or protected. The less surface area you expose, the more room you have to improve things later.

## The weight of a bad release

A bug in your side project means you fix it and push again. A bug in a plugin that causes a fatal and has already shipped? It hits differently.
You can't take it back, you have to fix it and ship a new hotfix release.

It's a morale hit first. Everyone is looking at what caused that fatal, and who introduced it. Nobody points fingers, usually. But if you were the one who wrote that line, you feel it. Depending on how avoidable the mistake was, you'll probably sit through a conversation about how to prevent it next time. I've been on both sides of that conversation. I've been the one listening and I've been the one giving it.

Then support starts getting tickets. Unhappy customers, one after another. And during all that chaos you have to do two things at once: find a workaround to tell people right now, and ship a hotfix as fast as you can without introducing another problem on top of the first one.

That changes how you think about testing. We run automated tests which are trying to cover most of the functionality being provided by our plugins. We do integration testing because we are mostly interested in how our plugin's offered functionality is meant to be used by the end user.

And still, things slip through. So you plan for the failure. Ship the fix fast. Communicate what happened. The worst thing you can do after a bad release is not act on it.

## Backwards compatibility is a feature

This one took me a while to internalize. When you're early in your career, backwards compatibility feels like a burden. You want to clean things up, remove the old way, move forward.

But when real businesses run on your plugin, when someone's event registration page is handling ticket sales for a conference next week, "we changed the API, check the changelog" is not an acceptable answer.

I've learned to treat backwards compatibility as a feature, not a constraint. The old function signature stays. You add the new behavior on top. You deprecate with clear messaging and a long timeline. The boring approach is the right one.

## Shared hosting is the real world

It's easy to develop on a fast machine with PHP 8.4 and a local MySQL instance. But a lot of WordPress sites run on shared hosting with limited memory, older PHP versions, and databases that choke on complex queries.

We've had queries that ran fine in development but timed out on a shared hosting server with 10,000 events. We've had background processes that got killed because the host limits PHP execution time to 30 seconds.

You learn to write defensive code. Batch everything. Check memory usage. Assume the worst about the environment. Not glamorous, but it's where your users actually live.
