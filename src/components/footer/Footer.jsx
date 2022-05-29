import React from "react";
import { styled } from "@mui/material";
import { FOOTER } from "../../utils/constants";
import { Logo } from "../index";

const FooterStyle = styled("div")(({ theme }) => ({
  height: FOOTER.BASE_HEIGHT,
  width: "100%",
  backgroundColor: theme.palette.neutral[100],
  justifyContent: "center",
  padding: "20px",

  "& ul": { listStyle: "none" },
  "& ul li": { marginTop: "15px" },
  "& .itemText": {
    fontSize: "15px",
    fontWeight: "300",
    color: theme.palette.neutral[600],
    marginTop: "15px",
  },
  "& .titleText": { fontWeight: "600" },
  "& .logoDiv": {
    width: "40%",
    display: "inline-block",
    paddingLeft: "160px",
    marginTop: "10px",
  },
  "& .footerItem": {
    width: "20%",
    display: "inline-block",
    marginLeft: "20px",
  },
  "& .brandText": {
    textAlign: "center",
    marginTop: "40px",
    fontSize: "20px",
    fontWeight: "600",
    color: theme.palette.neutral[600],
  },
  "& .topItem": { display: "flex", marginTop: "20px" },
}));

const Footer = () => {
  return (
    <>
      <FooterStyle className="footer">
        <div className="topItem">
          <div className="logoDiv">
            <Logo />
            <p className="itemText">
              This is the team that specializes in <br></br> making sure in the
              find it<br></br> your interior looks cool
            </p>
          </div>
          <div className="footerItem">
            <ul>
              <li className="titleText">Introduce</li>
              <li className="itemText">Terms and Condition</li>
              <li className="itemText">About Us</li>
              <li className="itemText">Privacy Policy</li>
            </ul>
          </div>
          <div className="footerItem">
            <ul>
              <li className="titleText">Support</li>
              <li className="itemText">Feedback</li>
              <li className="itemText">Contact Us</li>
              <li className="itemText">Cinema and tickets</li>
            </ul>
          </div>
          <div className="footerItem">
            <ul>
              <li className="titleText">Cinema</li>
              <li className="itemText">Movie</li>
              <li className="itemText">Theater</li>
              <li className="itemText">News and Offers</li>
            </ul>
          </div>
        </div>
        <div className="brandText">© 2022 - FCine</div>
      </FooterStyle>
    </>
  );
};

export default Footer;
