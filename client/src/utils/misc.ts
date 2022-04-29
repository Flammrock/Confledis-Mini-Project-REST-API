export const getBackendURI = () => {
    switch(process.env.NODE_ENV) {
        case 'development':
         /**
          * url start with `//` to get the scheme actually used by the browser
          * @see https://www.rfc-editor.org/rfc/rfc3986#section-4.2
          * @see https://www.paulirish.com/2010/the-protocol-relative-url/
          */
          return '//127.0.0.1:5000';
        case 'production':
        default:
            return '';
      }
};