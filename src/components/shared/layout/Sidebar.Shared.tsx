import { Sidenav, Nav } from 'rsuite';
import SiteIcon from '@rsuite/icons/Site';
import MemberIcon from '@rsuite/icons/Member';
import CodeIcon from '@rsuite/icons/Code';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import MessageIcon from '@rsuite/icons/Message';
import { useEffect, useState } from 'react';
import { useThemeContext } from '../../../context/themeContext/Theme.Context';
import { useLayoutContext } from '../../../context/layoutContext/Layout.Context';
import { SHARED } from '../../../language';
import { useLocation } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';

const SidebarShared = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { onChangeTheme, theme, language, } = useThemeContext();
  const { layoutConfig, onChangeLayout, } = useLayoutContext();
  const [activeKey, setActiveKey] = useState('1');

  useEffect(() => {
    let newActiveKey = "1";
    const activeSection = searchParams.get("s");
    switch (activeSection) {
      case "welcome":
        newActiveKey = "1";
        break;

      case "about-me":
        newActiveKey = "2";
        break;

      case "experience":
        newActiveKey = "3";
        break;

      case "contact":
        newActiveKey = "5";
        break;
    
      default:
        const { pathname } = location;
        switch (pathname) {
          case "/":
            newActiveKey = "1";
            break;
          case "/users":
            newActiveKey = "4-1";
            break;
          case "/tardi-game":
            newActiveKey = "4-5";
            break;
        
          default:
            break;
        }
        break;
    }
    setActiveKey(newActiveKey)
  }, [searchParams, location]);

  return (
    <div 
      style={{ width: "fit-content", height: "100%", maxHeight: "100%", position: "fixed", zIndex: 7 }}
    >
      <Sidenav 
        expanded={layoutConfig.isExpandedSidebar} 
        style={{ height: "100%", maxHeight: "100%" }}
      >
        <Sidenav.Header style={{ marginBottom: "auto", padding: "10px 5px", textAlign: "center", backgroundColor: theme === "dark" ? "black" : "transparent" }}>
          <img
            src='/images/port-o1.png'
            alt='Portfolio logo'
            style={{
              width: "40px",
            }}
            onClick={() => onChangeTheme(theme === "dark" ? "light" : "dark")}
          />
          <p style={{ fontWeight: "600", color: theme === "dark" ? "white" : "inherit" }}>Otniel</p>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<SiteIcon />} as={Link} to='/?s=welcome'>
              {SHARED.SIDEBAR[language].A}
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<MemberIcon />} as={Link} to='/?s=about-me'>
              {SHARED.SIDEBAR[language].B}
            </Nav.Item>
            <Nav.Item eventKey="3" icon={<CodeIcon />} as={Link} to='/?s=experience'>
              {SHARED.SIDEBAR[language].C}
            </Nav.Item>
            <Nav.Item eventKey="5" icon={<MessageIcon />} as={Link} to='/?s=contact'>
              {SHARED.SIDEBAR[language].D}
            </Nav.Item>
            <Nav.Menu 
              placement="rightStart" 
              eventKey="4" 
              title={SHARED.SIDEBAR[language].E}
              icon={<MagicIcon />}
            >
              <Nav.Item active={activeKey === "4-1"} eventKey="4-1" as={Link} to={"/users"}>
                {SHARED.SIDEBAR[language].F}
              </Nav.Item>
              <Nav.Item active={activeKey === "4-2"} eventKey="4-2" as={Link} to={"/ocr"}>
                {SHARED.SIDEBAR[language].G}
              </Nav.Item>
              <Nav.Item active={activeKey === "4-3"} eventKey="4-3" as={Link} to={"/pwa"}>
                {SHARED.SIDEBAR[language].H}
              </Nav.Item>
              <Nav.Item active={activeKey === "4-4"} eventKey="4-4" as={Link} to={"/excels"}>
                {SHARED.SIDEBAR[language].I}
              </Nav.Item>
              <Nav.Item active={activeKey === "4-5"} eventKey="4-5" as={Link} to={"/tardi-game"}>
                {SHARED.SIDEBAR[language].J}
              </Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle 
          onToggle={expanded => onChangeLayout({ ...layoutConfig, isExpandedSidebar: expanded })} 
        />
      </Sidenav>
    </div>
  );
};

export default SidebarShared;