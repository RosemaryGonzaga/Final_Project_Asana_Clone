json.set! @user.id do
    json.extract! @user, :primary_email, :full_name, :image_url
end