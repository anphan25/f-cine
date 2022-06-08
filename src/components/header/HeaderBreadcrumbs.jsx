import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

HeaderBreadcrumbs.propTypes = {
  links: PropTypes.array,
  action: PropTypes.node,
  heading: PropTypes.string.isRequired,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sx: PropTypes.object,
};

function HeaderBreadcrumbs({ links, action, heading, sx, ...other }) {
  const currentLink = links[links.length - 1].name;

  const listActiveLast = links.map((link) => (
    <Box
      key={link.name}
      sx={{
        fontSize: 14,
      }}
    >
      {link.name !== currentLink ? (
        <Link to={link.to}>{link.name}</Link>
      ) : (
        <Typography
          sx={{
            fontSize: "inherit",
            maxWidth: 260,
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "text.disabled",
            textOverflow: "ellipsis",
          }}
        >
          {currentLink}
        </Typography>
      )}
    </Box>
  ));

  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>

          <MUIBreadcrumbs separator={<HiChevronRight />} {...other}>
            {listActiveLast}
          </MUIBreadcrumbs>
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>
    </Box>
  );
}

export default HeaderBreadcrumbs;
