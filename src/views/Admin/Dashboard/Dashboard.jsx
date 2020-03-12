import React from "react";
import { Card, Statistic, Row, Col, Spin, PageHeader } from "antd";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";
import { services } from "../../../services";
import useStyles from "./Dashboard.style";
export default function Dashboard() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [overviewData, setOverviewData] = React.useState(null);
  const [trend, setTrend] = React.useState(
    Array.from({ length: 24 }).map((e, i) => {
      return {
        value: 0,
        time: `${i}时`
      };
    })
  );

  React.useEffect(() => {
    setLoading(true);
    services("/data/overview")
      .then(res => {
        setLoading(false);
        setTrend(
          res.data.trend.split(",").map((e, i) => ({
            value: +e,
            time: `${i}时`
          }))
        );
        setOverviewData(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Card className={classes.chartCard}>
        <span>接入趋势图</span>
        {loading ? (
          <Spin className={classes.loading} />
        ) : (
          <Chart height={400} data={trend} padding={"auto"} forceFit>
            <Axis name="time" />
            <Axis name="value" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="line" position="time*value" size={2} />
            <Geom
              type="point"
              position="time*value"
              size={4}
              shape={"circle"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
            />
          </Chart>
        )}
      </Card>
      <Card className={classes.statistics}>
        {loading ? (
          <Spin className={classes.loading} />
        ) : (
          <Row>
            <Col span={6}>
              <Statistic title={"接入数量"} value={overviewData?.count} />
            </Col>
            <Col span={6}>
              <Statistic
                title={"平均接入数量"}
                value={overviewData?.avgCount}
              />
            </Col>
            <Col span={6}>
              <Statistic title={"接入时长"} value={overviewData?.duration} />
            </Col>
            <Col span={6}>
              <Statistic
                title={"平均接入数量"}
                value={overviewData?.avgDuration}
              />
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
}
