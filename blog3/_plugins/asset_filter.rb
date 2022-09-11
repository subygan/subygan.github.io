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
        l
    end

    def directory_get(pages, cur)
#     puts "\n\n\n\n\n^^^^^^^^^^^^^^^^^^^^^^^"
    #     Getting all possible urls
        d = Hash.new
        result = Set.new
        l = ""

        for page in pages
            d[page["url"]] = page["title"]
        end
#         puts d
        nested = Hash.new
        d.each_with_index do |(key, value), index|

            removed = key[1..key.length] # removing the first '/'
            v = removed.split('/',-1) # splitting the string
#
#             for i in 0..v.length-1
#
#             end

#             l+= "<p>index: #{index} | key: #{v} | value: #{value}</p>"
            nested = Add_nest_dict(nested, v, value)
        end
#         puts "nested #{nested}"
#         nested.each_with_index do |(key, value), index|
#           l += gen_html(value,key, "", "/#{key}")
#           puts "l^^ #{l}"
#         end
#         puts nested
        l = gen_html(nested, "", "", "")

        l
    end

    def gen_html(d, v, s, pref)
#         puts "^^^^^^^^^^#{d}^^^^^^^^^^#{v}^^^^^^^^^^#{s}^^^^^^^^^^#{pref}"
        s = s.to_s

        if d.is_a?(Hash)
            s+="<ul>"
            d.each_with_index do |(key, value), index|
#                     puts  "#{isValidValue(value)} #{isValidKey(key)}"
                if !isValidValue(value) || !isValidKey(key)
#                     puts "skipping #{key} #{value}"
                else
#                     puts "key: #{key} | value: #{value}"
                    if value.is_a?(Hash)
                        if value.key?("")
                            title = value[""]
                            s+="<li><a href=\"#{pref}/#{key}\">#{title}</a></li>"
                            s += gen_html(value, key, "", "#{pref}/#{key}")
                        else
                            s += "<li><a href=\"#{pref}/#{key}\">#{key}</a></li>"
                            s += gen_html(value, key, "", "#{pref}/#{key}")
                        end
                    else value.is_a?(String)
                        s += "<li><a href=\"#{pref}/#{key}\">#{value}</a></li>"
                    end
                end
            end
            s+="</ul>"
        else d.is_a?(String)
#             puts "is string"
            s += "<ul><li><a>#{d}</a></li></ul>"
        end
#         puts "s: #{s}"
        return s
    end

    def isValidValue(value)

        if value.nil?
            false
        end
    true
    end

    def isValidKey(key)
        black_list = ["sitemap.xml","toc","about", "assets","main.css", "style.css", "404.html", "all.html", "feed","feed.xml", "robots.txt", ""]
        if key.nil?
            return false
        end
        if black_list.include? key
            return false
        end
    true
    end

    def Add_nest_dict(d, key, value)
#         puts "^^^key:#{key} val: #{value}"
       if key.length <2
        if d == nil
          return value
        end
#         puts "d: #{d} key:#{key} val: #{value}"
        d[key[0]] = value
        return d
       end
       for i in 0..key.length-1
#             puts "key: #{key[i]}"
#             puts "d: #{d.class}"
#             puts "dkey: #{d}"
            if d[key[i]] == nil
#                 puts "^^^^^^^"
                lis = key[i+1..key.length]
                if lis.length > 0
                   d[key[i]] = Add_nest_dict(Hash.new, lis , value)
                end
                break
            else
#                 puts "^^^^^^^"
                if d[key[i]].to_s.end_with?('.css')
#                     puts "css: #{key[i]}"
                else
                    lis = key[i+1..key.length]
                    if lis.length > 0
                        d[key[i]] = Add_nest_dict(d[key[i]], lis , value)
                    else
                        d[key[i]] = value
                        break
                    end
                end
                break
            end
#             puts "^^^^^^^"
       end
       d
    end


  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)