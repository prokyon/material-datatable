import React from "react";
import {findDOMNode} from "react-dom";
import classNames from "classnames";
import TableHead from "@material-ui/core/TableHead";
import MaterialDatatableHeadRow from "./MaterialDatatableHeadRow";
import MaterialDatatableHeadCell from "./MaterialDatatableHeadCell";
import MaterialDatatableSelectCell from "./MaterialDatatableSelectCell";
import {withStyles} from "@material-ui/core/styles";

const defaultHeadStyles = {
    main: {},
    responsiveStacked: {
        "@media screen and (max-width: 960px)": {
            display: "none",
        },
    },
};

class MaterialDatatableHead extends React.Component {
    componentDidMount() {
        this.props.handleHeadUpdateRef(this.handleUpdateCheck);
    }

    handleToggleColumn = index => {
        this.props.toggleSort(index);
    };

    handleRowSelect = () => {
        this.props.selectRowUpdate("head", null);
    };

    render() {
        const {classes, columns, count, options, setCellRef, selectedRows} = this.props;

        const numSelected = (selectedRows && selectedRows.data.length) || 0;
        const isDeterminate = numSelected > 0 && numSelected < count;
        const isChecked = numSelected === count ? true : false;

        return (
            <TableHead
                className={classNames({
                    [classes.responsiveStacked]: options.responsive === "stacked",
                    [classes.main]: true
                })}>
                <MaterialDatatableHeadRow>
                    {options.selectableRows && (
                        <MaterialDatatableSelectCell
                            ref={el => setCellRef(0, findDOMNode(el))}
                            onChange={this.handleRowSelect.bind(null)}
                            indeterminate={isDeterminate}
                            checked={isChecked}
                        />
                    )}
                    {columns.map(
                        (column, index) =>
                            column.display === "true" &&
                            (column.customHeadRender ? (
                                column.customHeadRender({index, ...column}, this.handleToggleColumn)
                            ) : (
                                <MaterialDatatableHeadCell
                                    key={index}
                                    index={index}
                                    type={"cell"}
                                    ref={el => setCellRef(index + 1, findDOMNode(el))}
                                    sort={column.sort}
                                    width={column.width}
                                    headerNoWrap={column.headerNoWrap}
                                    sortDirection={column.sortDirection}
                                    toggleSort={this.handleToggleColumn}
                                    options={options}>
                                    {column.name}
                                </MaterialDatatableHeadCell>
                            )),
                    )}
                </MaterialDatatableHeadRow>
            </TableHead>
        );
    }
}

export default withStyles(defaultHeadStyles, {name: "MaterialDatatableHead"})(MaterialDatatableHead);
