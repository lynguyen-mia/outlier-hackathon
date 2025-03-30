import React, { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol: string;
  theme?: "light" | "dark";
  height?: number;
  width?: number | string;
  showToolbar?: boolean;
  showStudies?: boolean;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol,
  theme = "light",
  height = 400,
  width = 600,
  showToolbar = true,
  showStudies = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (containerRef.current) {
        new (window as any).TradingView.widget({
          container_id: containerRef.current.id,
          symbol: symbol,
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: theme === "dark" ? "#1A202C" : "#F3E8FD",
          enable_publishing: false,
          allow_symbol_change: true,
          save_image: false,
          height: height,
          width: width,
          hideideas: true,
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",
          studies: showStudies
            ? [
                "MASimple@tv-basicstudies",
                "RSI@tv-basicstudies",
                "Volume@tv-basicstudies",
                "BB@tv-basicstudies",
                "StochasticRSI@tv-basicstudies",
                "MACD@tv-basicstudies",
              ]
            : [],
          show_chart_property_page: true,
          withdateranges: true,
          hide_side_toolbar: !showToolbar,
          studies_overrides: {},
          disabled_features: ["header_symbol_search"],
          enabled_features: ["study_templates"],
          overrides: {
            "mainSeriesProperties.candleStyle.upColor": "#48BB78",
            "mainSeriesProperties.candleStyle.downColor": "#F56565",
            "mainSeriesProperties.candleStyle.borderUpColor": "#48BB78",
            "mainSeriesProperties.candleStyle.borderDownColor": "#F56565",
            "mainSeriesProperties.candleStyle.wickUpColor": "#48BB78",
            "mainSeriesProperties.candleStyle.wickDownColor": "#F56565",
          },
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [symbol, theme, height, width, showToolbar, showStudies]);

  return (
    <div
      id={`tradingview_${symbol}`}
      ref={containerRef}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor:
          theme === "dark"
            ? "rgba(26, 32, 44, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
      }}
    />
  );
};

export default TradingViewChart;
