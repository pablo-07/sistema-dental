import Sidebars from "./Sidebar/Sidebar"

export const BaseLayout = ({children})=> {
    <div className="layout">
        <Sidebars/>
        {children}
    </div>
}