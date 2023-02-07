import "./LauoutStyle.css"

export default function Layout(props){
    return(
        <div>
            <div className="spaces">
                {props.header}
                {props.content}
            </div>
            <div>
                {props.footer}
            </div>
        </div>
    )
}
