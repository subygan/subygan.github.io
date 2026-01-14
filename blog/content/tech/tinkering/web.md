---
emoji: 🕸️ 
title: web
description: Web stuff that are curious or interesting
date: 2023-04-03
layout: base
tags: ["tech", "programming"]
---

### no cache image

```shell
curl -s -I -X GET https://i.countdownmail.com/2212f0.gif
 
    HTTP/2 200 
    date: Sat, 08 Oct 2022 07:10:40 GMT
    content-type: image/gif
    vary: Accept-Encoding
    cache-control: no-cache,no-store,must-revalidate,max-age=0,proxy-revalidate,no-transform,private
    pragma: no-cache
    expires: -1
    cf-cache-status: BYPASS
    report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=ojsVIWtY5FGmXMXpki%2BZhdPypWt9kJuNg1tWhv8q691GSk7n5Y2zuCCtFcFvTP%2FCMdLASEF90CYfW7sTh3rrcdGzwwEHl524UpTYmJrIU9uoFJ%2Br%2FTCOBAiBJeySbcA7UDrt%2Fr3e"}],"group":"cf-nel","max_age":604800}
    nel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
    server: cloudflare
    cf-ray: 756d0edc3bd13c13-BLR
    alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400

```

Basically, this is a service that creates timer gifs. based on the URL. the `cache-control` part is the most interesting. This is pretty efficient and asks the browser to not cache anything. This ensures that everytime the cache is new


### subresource integrity

https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity