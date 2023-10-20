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
        this.index = props.index;

        this.name = props.name;
        this.doseStrength = props.doseStrength;
        this.pkSize = props.pkSize;
        this.daySupply = props.daySupply;
        this.frequency = props.frequency;
    }
    createOptionArr()
    {
        this.opt = document.createElement("option");
        this.opt.append(document.createElement('ul'))
    }
    generateSig()
    {

    }

}
export default QueryObject;