source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

gem 'rails', '~> 6.0.0.rc1'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.12'
gem 'devise', '~> 4.6.2'
gem 'webpacker', '~> 4.0'
gem 'jbuilder', '~> 2.5'
gem 'redis', '~> 4.0'
gem 'jwt', require: false
gem 'bootsnap', '>= 1.4.2', require: false
gem 'nokogiri', require: false

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
