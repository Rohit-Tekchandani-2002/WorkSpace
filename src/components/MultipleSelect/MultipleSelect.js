import './MultipleSelect.css';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const MultipleSelect = (props) => {
    const { onChange, value } = props;
    const [openMenu, setOpenMenu] = useState(false);
    const [seletedValue, setSeletedValue] = useState([]);
    const [Options, setOptions] = useState(props.Options);

    const handleSearch = (e) => {
        let value = _.get(e, 'target.value');
        if (value !== '') {
            let tempOptions = _.filter(Options, (option) => {
                if (_.includes(_.lowerCase(_.replace(_.get(option, 'label'), ' ', '')), _.lowerCase(_.replace(value, ' ', '')))) {
                    return option;
                }
            })
            setOptions(tempOptions);
        }
        if (value === '') {
            setOptions(props.Options);
        }
    }

    const handelSelect = (e) => {
        let isChecked = _.get(e, 'target.checked');
        let checkedVal = _.get(e, 'target.value');
        let tempcheckboxValue = [];
        if ((isChecked === true) && (checkedVal === 'selectAll')) {
            _.map(Options, (e) => tempcheckboxValue.push(e.value));
        }
        else {
            if (checkedVal !== 'selectAll') {
                let tempSelectedValue = seletedValue;
                checkedVal = Number(checkedVal);
                if (tempSelectedValue.includes(checkedVal)) {
                    tempcheckboxValue = _.filter(tempSelectedValue, item => item !== checkedVal);
                }
                else {
                    tempcheckboxValue = [...seletedValue, checkedVal];
                }
            }
        }
        setSeletedValue(tempcheckboxValue);
        onChange(tempcheckboxValue);
    };

    useEffect(() => {
        if (value === null) {
            setSeletedValue([]);
        }
    }, [value])
    
    const getOptions = () => {
        return (
            <>
                <div className='form-group multi-select-search'>
                    <FontAwesomeIcon icon={faSearch} className='pe-2' />
                    <input className='input-group' placeholder='Search...' onChange={handleSearch} />
                </div>
                <ul className='multi-select-ul'>
                    <li>
                        <input
                            className='multi-checkbox'
                            key={'select all'}
                            value={"selectAll"}
                            onChange={handelSelect}
                            type='checkBox' />
                        Select All
                    </li>
                    {_.map(Options, (e) =>
                        <li key={_.get(e, 'value')}>
                            <input
                                className='multi-checkbox'
                                type='checkBox'
                                key={_.get(e, 'value')}
                                value={_.get(e, 'value')}
                                checked={seletedValue.includes(_.get(e, 'value'))}
                                onChange={handelSelect} />
                            {_.get(e, 'label')}
                        </li>
                    )}
                </ul>
            </>
        );
    }

    const getButtonContent = () => {
        let tempContent = null;
        let tempseletedValue = seletedValue;
        if (_.get(tempseletedValue, 'length') <= 2) {
            tempContent = _.map(_.filter(Options,
                e => tempseletedValue.includes(_.get(e, 'value'))
            ), e => <span className='selectedLable' key={_.get(e, 'value')}>{_.get(e, 'label')}</span>)
        }
        else {
            if (_.get(tempseletedValue, 'length') === _.get(Options, 'length')) {
                tempContent = 'Select All';
            }
            else {
                tempContent = <span className='selectedLable'>{_.get(tempseletedValue, 'length')} Items</span>
            }
        };
        if (_.get(tempContent, 'length', 0) === 0) {
            tempContent = 'None Selected';
        }
        return tempContent;
    }

    useEffect(() => {
        getButtonContent();
        getOptions();
    }, [seletedValue])

    return (
        <>
            <button className="form-select custom-multiselect" onClick={() => setOpenMenu(!openMenu)} type='button'>
                {getButtonContent()}
            </button>
            <Dropdown.Menu show={openMenu}>
                {getOptions()}
            </Dropdown.Menu>
        </>
    );
}

export default MultipleSelect