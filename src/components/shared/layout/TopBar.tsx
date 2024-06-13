import React from "react";
import { useIsAtTopPosition } from "../../../hooks";
import { Animation, Toggle } from "rsuite";
import CreativeIcon from '@rsuite/icons/Creative';
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import { useThemeContext } from "../../../context/themeContext/Theme.Context";

const Panel = React.forwardRef((props, ref) => {
  const { theme, onChangeTheme, language, onChangeLanguage, } = useThemeContext();

  return (
    <div
      {...props}
      ref={ref as any}
      style={{
        width: "100vw",
        height: 40,
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "200px",
          padding: "0px 10px",
          display: "flex",
          justifyContent: "end",
          gap: 5
        }}
      >
        <Toggle 
          checkedChildren={<EyeCloseIcon />} 
          unCheckedChildren={<CreativeIcon />} 
          size="sm"
          checked={theme === "dark"}
          onChange={() => onChangeTheme(theme === "dark" ? "light" : "dark")}
        />
        <Toggle 
          size="sm" 
          checkedChildren="EN" 
          unCheckedChildren="ES" 
          checked={language === "EN"}
          onChange={() => onChangeLanguage(language === "EN" ? "ES" : "EN")}
        />
      </div>
    </div>
  )
});

const TopBar = () => {
  const { isAtTop, } = useIsAtTopPosition();

  return (
    <>
      <Animation.Slide in={isAtTop} placement="top">
        {(props, ref) => <Panel 
          {...props} 
          ref={ref} 
        />}
      </Animation.Slide>
    </>
  );
};

export default TopBar;