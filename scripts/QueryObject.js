const defaultProps =
{
}
//flatten data structure by one
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
        this.index;

        this.name = props.name;
        this.doseStrength = props.doseStrength;
        this.pkSize = props.pkSize;
        this.daySupply = props.daySupply;
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