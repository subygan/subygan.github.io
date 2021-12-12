module Jekyll
  module AssetFilter
    def asset_url(input)

        "new"
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)