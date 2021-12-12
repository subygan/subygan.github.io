module Jekyll
  module AssetFilter
    def asset_url(pages, cur)

#     Getting all possible urls
        everythin = []
        result = Set.new
        everythin
        p "$$4"
        l = ""

        for page in pages
            url = page["url"]
            if url.index(cur)==0
                if url.length != cur.length
                    stripped = url[cur.length-1..-1]
                    s = stripped.split('/',-1)[1]
#                     l+="#{page["emoji"]}[#{page["title"]}](#{url})\n"
                    l+="<p>#{page["emoji"]}<a href=\"#{page["url"]}\">#{page["title"]}</a></p>\n"
                    result << s

                end
            end
           # code to be executed
        end
        p result
        p result.to_a
        pages[2]
        l
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)