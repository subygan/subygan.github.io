#!/usr/bin/env bash
# Ping IndexNow (Bing, Yandex, Seznam, Naver, ...) with every URL in the live sitemap.
# Key file is served from blog/static/9cb3053414a15bc228675d238e8311c5.txt. Usage: ./indexnow.sh [url ...]
set -euo pipefail
HOST=subygan.com
KEY=9cb3053414a15bc228675d238e8311c5
if [ $# -gt 0 ]; then urls=("$@"); else
  urls=($(curl -fsS https://$HOST/sitemap.xml | grep -o '<loc>[^<]*' | cut -c6-))
fi
json=$(printf '%s\n' "${urls[@]}" | python3 -c 'import json,sys;print(json.dumps({"host":sys.argv[1],"key":sys.argv[2],"keyLocation":f"https://{sys.argv[1]}/{sys.argv[2]}.txt","urlList":[l.strip() for l in sys.stdin if l.strip()][:10000]}))' "$HOST" "$KEY")
echo "Submitting ${#urls[@]} URLs"
curl -sS -o /dev/null -w "IndexNow HTTP %{http_code}\n" -H 'Content-Type: application/json; charset=utf-8' -d "$json" https://www.bing.com/indexnow  # shared with all IndexNow engines
