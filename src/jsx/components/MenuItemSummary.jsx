import { Row, Col } from 'react-bootstrap';


export default function MenuItemSummary(props) {
    var ingredients;
    var otherIngredients;
    if ( props.menuItem.ingredients.length == 0) {
        ingredients = '';
    } else if (props.menuItem.ingredients.length == 1) {
        ingredients = props.menuItem.ingredients[0];
    } else {
        ingredients = `${props.menuItem.ingredients[0]}, ${props.menuItem.ingredients[1]}`;
    }

    switch (props.menuItem.ingredients.length) {
        case 0:
        case 1:
        case 2:
            otherIngredients = '';
            break;
        case 3:
            otherIngredients = 'And 1 other ingredient';
            break;
        default:
            otherIngredients = `And ${props.menuItem.ingredients.length - 2} other ingredients`;
    }

    var keywords;
    switch (props.menuItem.keywords.length) {
        case 0:
            keywords = <ul className="list-inline m0"></ul>;
            break;
        case 1:
            keywords = (
                <ul className="list-inline m0">
                    <li><div className="badge bg-green">{ props.menuItem.keywords[0] }</div></li>
                </ul>
            );
            break;
        case 2:
            keywords = (
                <ul className="list-inline m0">
                    <li><div className="badge bg-green">{ props.menuItem.keywords[0] }</div></li>
                    <li><div className="badge bg-green">{ props.menuItem.keywords[1] }</div></li>                    
                </ul>
            );
            break;
        default:
            keywords = (
                <ul className="list-inline m0">
                    <li><div className="badge bg-green">{ props.menuItem.keywords[0] }</div></li>
                    <li><div className="badge bg-green">{ props.menuItem.keywords[1] }</div></li>
                    <li><div className="badge bg-purple">more</div></li>
                </ul>
            );
    }
    
    return (
        <div className="media p mt0 list-group-item" onClick={ props.onClick }>
            <span className="close">&times;</span>
            <span className="pull-left">
                <img src="/img/mood04.jpg" className="media-object img-circle thumb32" />
            </span>
            <Row>
                <Col md={ 3 }>
                    <span className="media-body">
                        <span className="media-heading">
                            <strong>{ props.menuItem.name }</strong>
                            <br/>
                            <small className="text-muted">{ props.menuItem.description }</small>
                        </span>
                    </span>
                </Col>
                <Col md={ 3 }>
                    <span className="media-body">
                        <span className="media-heading">
                            <strong>{ ingredients }</strong>
                            <br/>
                            <small className="text-muted">{ otherIngredients }</small>
                        </span>
                    </span>
                </Col>
                <Col md={ 4 }>
                    { keywords }
                </Col>
            </Row>
        </div>
    );
}
