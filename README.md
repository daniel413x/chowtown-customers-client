# Setup

### Create certs for Auth0 integration with Cypress

Cypress and Auth0 will not run together in a development or testing environment if the development server does not use HTTPS.

``mkdir certs``\
``cd certs``\
``sudo apt install mkcert``\
``mkcert -install``\
``mkcert localhost``