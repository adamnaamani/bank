# Bank API
![CI](https://github.com/adamnaamani/bank/workflows/CI/badge.svg?branch=master)
> A Ruby on Rails & ReactJS CRUD banking app, hosted on [Heroku](https://heroku.com).


## Guests
[Sign In](https://bank-rails-react.herokuapp.com/users/sign_in) to the guest account to take the app for a spin:
```
Email: guest@bank.com
Password: password
```
The Accounts list has a full-text search, sortable columns, delete action, and editable fields that update automatically on change. 
On the New Account page, provide a valid routing number and the bank fields will be populated automatically. A form cannot be saved without 
this number, with validations on both server and client side.


## Table of Contents
1. [Stack](#stack)
2. [Development](#development)
3. [Production](#production)
4. [Database](#database)
5. [Javascript](#javascript)
6. [Tasks](#tasks)
7. [Mobile](#mobile)


## Stack
* [Ruby 2.6.3](https://www.ruby-lang.org/en/)
* [Rails 6](http://rubyonrails.org)
* [PostgreSQL 10.3](https://www.postgresql.org)


## Development
```bash
rails server
yarn run dev
```


## Production
Procfile runs following command on Heroku release:
```bash
release: rake db:migrate
```


## Database
Postgres database has unique index for `accounts` and `institutions`, and is also validated in the Model:

* accounts
```ruby
validates :account_number, presence: true, uniqueness: true, length: { maximum: 10 }
```
* institutions
```ruby
validates :routing_number, presence: true, uniqueness: true, length: { is: 9 }
```


## Javascript
* [ReactJS](https://reactjs.org)
* [Redux](https://redux.js.org)
* [Webpack](https://webpack.js.org)
* [Yarn](https://yarnpkg.com/en/)

Rails Webpacker serves up React in pack tag:
```jsx
<%= javascript_pack_tag "react" %> 
```

Main `<App />` component is rendered when DOM is loaded:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')));
})
```


## Tasks
* [Thor](http://whatisthor.com)

Tasks are used for populating database from external Routing Numbers API. 
```ruby
class Command < Thor		
  require File.expand_path("config/environment.rb")
  require 'nokogiri'
  require 'open-uri'	
  require 'net/http'
end	
```


## Mobile
* Progressive Web App: Add Bank App to homescreen for native-like mobile functionality. 
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="white">
<meta name="apple-mobile-web-app-title" content="Bank">
```
