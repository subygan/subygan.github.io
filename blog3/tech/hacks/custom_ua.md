---
layout: base
type: page
emoji: 🐙
title: Custom user Agent for testing
description: Sending requests with custom user agent in chrome for debugging
---

A [user-agent](https://en.wikipedia.org/wiki/User_agent) is used to recognize the browser and the device the project, [whatismybrowser.com](https://developers.whatismybrowser.com/useragents/explore/) have a database of user agents it's just a string that says about your browser and device type that is sent as a cookie in every request. You can find your current user agent by googling "[what is my user agent](https://www.google.com/search?q=what+is+my+user+agent)"

These are incredible in their own interesting way.

But, I was stuck with a problem of trying to simulate a device with user agent and inspect it. The quick solution I did was go to [browserstack](https://www.browserstack.com/) and work on an actual device and get to inspect element for the free tier 1 minute. Which is incredible that you can work with a live device.

The most popular option if you google custom user agent, (unfortunately) is to use a python script. It makes sense, because usually people who want to spoof their user agent are data scrapers and bots

This whole thing left me wondering. why was there no simple solution to this problem?? why should I write a python script just to change a line in the request header.

It took me a while to realize that chrome might have a way to do that. and I started digging. And, here's my solution

### steps

1. Inspect element from the web page using ⌘ + ⌥ + i  in mach or Ctrl + Shift + J in windows.
2. Use the top right hamburger menu in the chrome dev tools console. Then "more tools" > "Network Conditions"
![adding Network conditions](/assets/images/custom_ua/1.png)
3. You should see the "Network Conditions" option in the bottom bar
   ![showing Network conditions](/assets/images/custom_ua/2.png)
4. For some weird reason chrome collapses it, if you are using the default dev console mode which is the bottom half of the page. it can be expanded by hovering between the lines (should look up what it is called technically).
5. now under the "user-agent" section unselect "browser default" and you can either select from a bunch of prebuilt user-agents or custom string.
   ![Changing browser default](/assets/images/custom_ua/3.png)
6. Reload the page et voila, you have the response from custom user-agent. all from your browser


### Note to self

There are usually far simpler solutions if we just wait for a second and think. instead of jumping the gun and doing the most accessible solution. It probably is not the most optimal