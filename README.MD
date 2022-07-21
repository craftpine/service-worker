# backend
- cd backend
- yarn install
- yarn dev

# frontend
- cd frontend
- yarn install
- yarn start

# html
- cd html
- yarn add http-server -g
- http-server 

make sure subscription is not null (open console tab)

# vapid keys
- web-push generate-vapid-keys

(replace key in /backend/index.js and /html/service.js)

why we need vapid key? (https://web.dev/push-notifications-web-push-protocol/)

