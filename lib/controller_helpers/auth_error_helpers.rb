# Things to work on later:
    # 1. DRY up code!

def validate_email_signup(email)
    email_char_counts = char_counts(email)
    if email.empty?
        return "Something doesn't look right. Please check the email and try again."
    elsif !email.include?('@')
        return "Please include an '@' in the email address. '#{email}' is missing an '@'."
    elsif email_char_counts['@'] === 1 && email.end_with?('@')
        return "Please enter a part following the '@'. '#{email}' is incomplete."
    elsif email_char_counts['@'] > 1
        return "A part following '@' should not contain the symbol '@'."
    else
        return nil  # need to pass the baton to rails validation
    end
end


def validate_email_login(email)
    email_char_counts = char_counts(email)

    if email.empty?
        return "Please fill out this field."
    elsif !email.include?('@')
        return "Please include an '@' in the email address. '#{email}' is missing an '@'."
    elsif email_char_counts['@'] === 1 && email.end_with?('@')
        return "Please enter a part following the '@'. '#{email}' is incomplete."
    elsif email_char_counts['@'] > 1
        return "A part following '@' should not contain the symbol '@'."
    else
        return nil   # need to pass the baton to rails validation
    end
end


def validate_password

end


################################################################################

# helpers for my helpers!
def char_counts(str)
    counts = Hash.new(0)
    str.split('').each { |char| counts[char] += 1 }
    counts
end