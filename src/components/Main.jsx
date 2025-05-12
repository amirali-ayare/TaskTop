import { BottomData } from "./BottomData"
import { Navbar } from "./Navbar"
import { Tasks } from "./Tasks"

export const Main = () => {
    return(
        <div className="w-80 h-100p">
            <Navbar />
            <Tasks />
            <BottomData />
        </div>
    )
}