# zoea
An experimental desktop Scuttlebutt client

[Scuttlebutt](https://www.scuttlebutt.nz/) is a decentralized social network that I happen to not dislike.

However, it's very much a small, early-adopter, and the available software...kind of reflects that.  I like what's there, but I also want something lighter-weight and a testbed to try out some onboarding methods.

So, _Zoea_ is going to be that testbed.

The first order of business is finding a reasonable GUI library that's lightweight (ruling out Electron), mostly portable, allows easy access to the existing Scuttlebutt libraries (limiting to Node.js implementations), ideally portable, includes text with some markup, and specifically runs on my machine (for obvious reasons).

On the other end, since [Scuttlebot](https://scuttlebot.io/) is available for Node.js, that's a lot more expedient than re-implementing the stack.
