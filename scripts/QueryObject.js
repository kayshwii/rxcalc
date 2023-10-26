const defaultProps =
{

}
//flatten data structure 
export class QueryObject
{
    constructor(props)
    {
        this.props =
        {
            ...defaultProps,
            ...props
        }
        this.arr = new Array();

        this.name = this.props.name;
        this.doseStrength = this.props.doseStrength;
        this.pkSize = this.props.pkSize;
        this.daySupply = this.props.daySupply;
        this.drugType = this.props.drugType;
        this.frequency = this.props.frequency;
        this.qty = this.props.qty;
        this.form = this.props.form;
        this.adminRoute = this.props.adminRoute;
    }
    createOptionArr()
    {
    }
    generateSig()
    {

    }

}
export default QueryObject;