import React from 'react';
import { SideNav } from '../components/common/SideNav';
import img from '../assets/img/not-found.png';

const PageNotFound = () => (
  <div>
    <div className="row">
      <div className="col l4 xl3">
        <SideNav className="black white-text" />
      </div>
      <div className="col l8 xl9 not-found">
        <img
          src={img}
          alt="not-found"
          style={{ width: '300px' }}
        />
        <h1>Page Not Found</h1>
      </div>
    </div>
  </div>
);

export default PageNotFound;
