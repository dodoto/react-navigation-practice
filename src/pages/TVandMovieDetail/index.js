import React, { useState } from 'react';
import AutoHeightWebView from 'react-native-autoheight-webview';

import Loading from '../../components/Loading';

export default function TVandMovieDetail({route:{params:{href}}}) {

  const [loading,setLoading] = useState(false);

  const loadHandler = () => {
    setLoading(true);
  }

  return (
    <>
      {!loading && <Loading />}
      <AutoHeightWebView 
        source={{uri:href}}
        style={{display: loading ? 'flex' : 'none'}}
        onLoad={loadHandler}
        customStyle={`
          .header-wrapper {
            display: none;
          }
          .search-wrapper {
            display: none;
          }
          .single-portfolio #content-container {
            padding: 30px;
          }
        `}
        viewportContent={'width=device-width, user-scalable=no'}
      />
    </>
  );
}