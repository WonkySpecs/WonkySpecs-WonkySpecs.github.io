---
layout: post
title: Shell scripting is weird
tag: programming
---
I've worked with bash and unix on and off for a few years now, and generally feel comfortable working in a terminal. Recently, however, I've joined a project that involves lots of both writing, and running code over ssh, and have had to learn a lot of things in the process. And it crystallized for me today - shell scripting is **weird**.

There's an unending pile of seemingly arbitrary, often inconsistent _stuff_ that you just have to know, somehow, in order to use unix to even a fraction of its full potential. How do you learn these things? The internet. Man pages. Talking to other devs. All fine, and necessary, but my god is it _hard_ sometimes - keeping up with the unix toolbox alone could easily be a full time job, yet somehow we have to find time to actually, you know, write some code. 

This is pretty understandable in the context of such a massive, powerful system that has been around, and largely backwards compatible, since the 70s. Yet it shouldn't be forgotten that this huge pile of arcane knowledge is often a serious roadblock for newcomers to unix.

Below are a few of the things that, on reflection, are weird. For many practicing software devs, and sysadmins, most of these become ingrained if not in our heads, then in our fingers, or buried in scripts somewhere. But take a moment to reflect on a tiny selection of shells...

Arbitrary punctuation usage:
 - %n is used to refer to the nth job.
 - $ has unending meanings - it can be used for parameters ($n, "$@", $#), recent commands or exit statuses ($?, $!), or the process id of the shell itself ($$).
 - & at the end of a command runs the job in the background.

and unintuitive command names and flags:
 - top: a live display of the running processes on the system. Why top? 'Table of processes', according to wikipedia.
 - git: Of course, this is just a name, and a name can be anything. In this case, it means pretty much [whatever Linus Torvalds feels like](https://en.wikipedia.org/wiki/Git#Naming). But the amount of (often cryptic) two, three, four letter command names gets a bit nuts.
 - tail -f: Starts a job to show the end of a file 'live' - anything new written to the file is written to stdin. Why f? Follow, duh.

Yes, any possible choice for these things would be arbitrary, and what exists is probably fine. But I think it's important for beginners to remember - don't be discouraged. No one is born with innate knowledge of the flags for grep, or how piping works, or how to search for previous commands (Ctrl-r. Never type that long command twice again). Pick little things up one at a time, as they become useful for you. If you're doing something manually many times, or getting frustrated with something monotonous, ask the internet. A solution almost certainly exists. Ask questions of more experienced unix users - there are some serious wizards out there, and they're often more than happy to share tips and worflows. Here's my small contribution.

So to round out, here's my small contribution, which I learnt about in the last week:

 - Ctrl-z to stop (pause) the current foreground job, and send it to the background.
 - jobs - lists the currently running, stopped, and recently exitted jobs.
 - fg to bring the most recently backgrounded job to the foreground. Use the aforementioned %n to pull up a different job.
 - And as mentioned in the punctuation section, end a command with & to start it in the background.

All taken together, these are super useful for working asynchronously, something I've not had to do much before, but now I'm regularly running jobs that take a minute or more, this bit of unix has become indispensable. Happy shelling!
