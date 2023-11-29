import { useEffect, useState } from 'react';
import './MultiSelect.css';
import Dropdown from 'react-bootstrap/Dropdown';
import _ from 'lodash';

const MultiSelect = (props) => {
    const { Options } = props;
    const [openMenu, setOpenMenu] = useState(false);
    const [seletedValue, setSeletedValue] = useState(null); //value array
    const [optionsCheckBoxValue, setCheckBoxValue] = useState(Array(Options.length).fill(false));

    const handelSelect = (e) => {
        let isChecked = _.get(e, 'target.checked');
        let checkedVal = _.get(e, 'target.attributes.datavalue.value');
        if ((isChecked === true) && (checkedVal === 'selectAll')) {
            setCheckBoxValue(Array(_.get(Options, 'length')).fill(true));
            setSeletedValue('Selected All ');
        }
        else if ((isChecked === false) && (checkedVal === 'selectAll')) {
            setCheckBoxValue(Array(_.get(Options, 'length')).fill(false));
            setSeletedValue(null);
        }
        else {
            let checkedIndex = Number(_.get(e, 'target.attributes.dataindex.value'));
            let tempcheckboxValue = [];
            for (let i = 0; i < _.get(optionsCheckBoxValue, 'length'); i++) {
                const element = optionsCheckBoxValue[i];
                (checkedIndex === i) ? tempcheckboxValue.push(!element) : tempcheckboxValue.push(element);
            }
            setSeletedValue((seletedValue ?? '') + checkedVal + ',');
            setCheckBoxValue([...tempcheckboxValue]);
        }
    };

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    const getOptions = () => {
        return (
            <>
                <ul className='multi-select-ul'>
                    <li><input className='multi-checkbox' key={'select all'} datavalue={"selectAll"} onChange={handelSelect} type='checkBox' />Select All</li>
                    {
                        _.map(Options, (e, Index) =>
                            <li><input className='multi-checkbox' type='checkBox' key={e.value} datavalue={e.value} dataindex={Index} checked={optionsCheckBoxValue[Index]} onChange={handelSelect} />{e.label}</li>)
                    }
                </ul>
            </>
        );
    }

    useEffect(() => {
        getOptions;
    }, [optionsCheckBoxValue])

    return (
        <>
            <button className="form-select custom-multiselect" onClick={toggleMenu} type='button'>
                {(seletedValue ?? ' ').slice(0, -1)} Label
            </button>
            <Dropdown.Menu show={openMenu}>
                {getOptions}
            </Dropdown.Menu>
        </>
    );
}

export default MultiSelect