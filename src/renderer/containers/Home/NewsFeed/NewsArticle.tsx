import type { NewsItem } from "@common/types";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React from "react";
import TimeAgo from "react-timeago";

import { MarkdownContent } from "@/components/MarkdownContent";

export interface NewsArticleProps {
  item: NewsItem;
}

export const NewsArticle: React.FC<NewsArticleProps> = ({ item }) => {
  const { imageUrl, title, subtitle, permalink, body, publishedAt } = item;
  const localDateString = moment(publishedAt).format("LLL");

  const onClick = () => window.electron.shell.openPath(permalink);
  return (
    <Outer>
      <Card>
        {imageUrl && (
          <CardMedia
            css={css`
              height: 200px;
            `}
            image={imageUrl}
            title={title}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary" component="p">
              {subtitle}
            </Typography>
          )}
          {body && (
            <MarkdownContent
              content={body}
              css={css`
                color: #ccc;
                max-width: 700px;
              `}
            />
          )}
        </CardContent>
        <CardActions disableSpacing={true}>
          <Tooltip title={localDateString}>
            <DateInfo>
              Posted <TimeAgo date={new Date(publishedAt)} title="" />
            </DateInfo>
          </Tooltip>
          <Button size="small" color="primary" onClick={onClick}>
            Read more
          </Button>
        </CardActions>
      </Card>
    </Outer>
  );
};

const Outer = styled.div`
  margin-bottom: 20px;
`;

const DateInfo = styled.div`
  margin-right: auto;
  margin-left: 5px;
  opacity: 0.6;
  font-size: 15px;
`;
