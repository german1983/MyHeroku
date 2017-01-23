import {Header} from "../Shared/header.jsx"
import {Footer} from "../Shared/footer.jsx"
export class Main extends React.Component {

    render() {
        return (
            <div>
              <Header />
                {/* add this */}
                {this.props.children}
              <Footer />
            </div>
        );
    }
}
