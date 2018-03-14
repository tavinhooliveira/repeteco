import { injectGlobal } from 'styled-components';
import bg from './images/bg.png';
/* eslint no-unused-expressions: 0 */
injectGlobal`
  :root {
    --image: url(${bg});
  }
  
  body {
    background: var(--image) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=var(--image), sizingMethod='scale');
    -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=var(--image), sizingMethod='scale')";
    background-image: var(--image);
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100vh;
    min-width: 100vw;
    margin: 0;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
