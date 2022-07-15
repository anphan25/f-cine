import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "assets/images/page-not-found.gif";
import style from "./404.module.css";

const NotFound = () => {
  return (
    <div className={style.center}>
      <img src={NotFoundImage} alt="404" />
      <div>
        <h1 className={style.block}> Sorry something went wrong </h1>
        <h1 className={style.block}>
          Please back to {""}
          <span>
            <Link to="/" className={style.home}>
              dashboard
            </Link>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
