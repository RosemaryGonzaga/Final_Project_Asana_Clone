@sections.each do |section|
    json.set! section.id do
        debugger
        json.partial! 'api/sections/section', section: section
    end
end