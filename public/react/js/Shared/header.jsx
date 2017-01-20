import { Link } from 'react-router'

export class Header extends React.Component {
     render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" onlyActiveOnIndex={true} className="navbar-brand" >German4Lixar</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Pokemon</Link></li>
                        <li><Link to="/iv" activeClassName="active">IV Calculator</Link></li>
                        <li><Link to="/moves" activeClassName="active">Moves</Link></li>
                        <li><Link to="/evolution" activeClassName="active">Evolution Calculator </Link></li>
                    </ul>
                </div>
            </nav>
        )
    }

}
