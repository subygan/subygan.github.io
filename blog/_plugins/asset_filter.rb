module Jekyll
  module AssetFilter
    def asset_url(pages, cur)

#     Getting all possible urls
        everythin = []
        result = Set.new
        everythin
        l = ""

        for page in pages
            url = page["url"]
            if url.index(cur)==0
                if url.length != cur.length
                    stripped = url[cur.length-1..-1]
                    s = stripped.split('/',-1)
                    if s.length() < 4
                        l+="<p>#{page["emoji"]}  <a href=\"#{page["url"]}\">#{page["title"]}</a></p>\n"
                        result << s
                    end
                end
            end
           # code to be executed
        end
        pages[2]
        l
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)