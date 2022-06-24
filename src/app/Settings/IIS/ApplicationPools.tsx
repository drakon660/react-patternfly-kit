import * as React from 'react';
import { ActionList, ActionListItem, Button, Card, CardBody, CardFooter, CardTitle, DataList, DataListCell, DataListItem, DataListItemCells, DataListItemRow, Divider, Dropdown, DropdownItem, DropdownSeparator, DropdownToggle, DropdownToggleAction, Label, LabelGroup, Menu, MenuContent, MenuItem, MenuList, OptionsMenu, OptionsMenuItem, OptionsMenuToggle, PageSection, SearchInput, Select, SelectOption, SelectVariant, Split, SplitItem, Title } from '@patternfly/react-core';
import { ApplicationPool } from './ApplicationPool';
import "@patternfly/react-core/dist/styles/base.css";
import { useAppDispatch, useAppSelector } from '@app/store';
import { getApplicationPools, selectApplicationPools } from './applicationPoolSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { nameof } from '@app/utils/utils';
import { useLocation } from 'react-router-dom';


const ApplicationPools: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    let location = useLocation();
    const applicationPools = useAppSelector(selectApplicationPools);
    const [isActionOpen, setIsActionOpen] = React.useState<boolean>(false);
    const [isCogOpen, setisCogOpen] = React.useState<boolean>(true);

    const goDropdownItems = [
        <DropdownItem key="action" component="button">
            Action23
        </DropdownItem>,
    ];

    const onActionClick = (event) => {
        window.alert('You selected an action button!');
    };

    const showAllClick = ()=>{
        dispatch(getApplicationPools());
    }

    const onActionSelect = (event) => {
        setIsActionOpen(isActionOpen == !isActionOpen);
    };

    //const columns = ['Name', 'Identity', 'Managed PipeLine Mode', 'Net CLR Version', 'Status','Applications'];  

    const columns = [ 
        { 'key': 'Name', value : nameof<ApplicationPool>('name')},                     
        { 'key': 'Identity', value : nameof<ApplicationPool>('identity') }, 
        { 'key': 'Managed PipeLine Mode', value : nameof<ApplicationPool>('managedPipeLineMode') } ,
        { 'key': 'Net CLR Version', value : nameof<ApplicationPool>('netCLRVersion') },
        { 'key': 'Status', value : nameof<ApplicationPool>('status') }, 
        { 'key': 'Applications', value : nameof<ApplicationPool>('applications') },
    ]

    React.useEffect(()=>{
        dispatch(getApplicationPools()).then(unwrapResult).then(result=>{
            console.log(result);
          }).catch(result=>console.log(result));
    },[dispatch, location]);

    return (<PageSection>
        <Title headingLevel="h1" size="lg">
            ApplicationPools
        </Title>

        <Split hasGutter>
            <SplitItem isFilled><ActionList isIconList>
            <ActionListItem>
                <LabelGroup categoryName="">
                    <Label color="blue">Filter</Label>{' '}
                </LabelGroup>
            </ActionListItem>
            <ActionListItem>
                <SearchInput
                    placeholder="Find by name"
                />
            </ActionListItem>
            <ActionListItem>
                <Dropdown
                    onSelect={onActionSelect}
                    toggle={
                        <DropdownToggle
                            splitButtonItems={[
                                <DropdownToggleAction key="action" onClick={onActionClick}>
                                    Action1111
                                </DropdownToggleAction>
                            ]}
                            splitButtonVariant="action"
                            onToggle={setIsActionOpen}
                        />
                    }
                    isOpen={isActionOpen}
                    dropdownItems={goDropdownItems}
                />{' '}
            </ActionListItem>
            <ActionListItem>
            <Button variant="primary" onClick={showAllClick}>Show All</Button> 
            </ActionListItem>
            <ActionListItem>
                <GoMenu />
            </ActionListItem>
            <ActionListItem>
                <Label color="blue">Group by:</Label>{' '}
            </ActionListItem>
            <ActionListItem>
                <Grouping />
            </ActionListItem>
        </ActionList>
      

       <TableView<ApplicationPool> columns={columns} items={applicationPools} onItemSelected={(id)=>alert(applicationPools[id].name)}></TableView></SplitItem>

       <SplitItem>
       <Menu >
        <MenuContent>
          <MenuList>
            <MenuItem itemId={0}>Actions</MenuItem>
            <MenuItem itemId={1}>Add Appplication Pool</MenuItem>
            <Divider component="li" />
            <MenuItem itemId={2}>Action 3</MenuItem>
          </MenuList>
        </MenuContent>
      </Menu>
      </SplitItem>
        {/* <Card>
    <CardTitle>Actions</CardTitle>
    <CardBody>Add Appplication Pool</CardBody>
    <CardFooter>Footer</CardFooter>
  </Card></SplitItem> */}
        </Split>

        
        {/* <DataGrid columns={columns} applicattionPools={applicationPools}/> */}
    </PageSection>)
};

const GoMenu = () => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [selectOption, setSelectOption] = React.useState<{ selectedOption: string }>();


    const onToggle = () => {
        setIsOpen(!isOpen);
    }

    const onSelect = (event) => {
        const id = event.currentTarget.id;
        setSelectOption({ selectedOption: id });
        setIsOpen(false);
    }

    const menuItems = [
        <OptionsMenuItem onSelect={onSelect} isSelected={selectOption?.selectedOption === "singleOption1"} id="singleOption1" key="option 1">Option 1</OptionsMenuItem>,
        <OptionsMenuItem onSelect={onSelect} isSelected={selectOption?.selectedOption === "singleOption2"} id="singleOption2" key="option 2">Option 2</OptionsMenuItem>,
        <OptionsMenuItem onSelect={onSelect} isSelected={selectOption?.selectedOption === "singleOption3"} id="singleOption3" key="option 3">Option 3</OptionsMenuItem>
    ];
    const toggle = <OptionsMenuToggle onToggle={onToggle} toggleTemplate="Go" />

    return (
        <OptionsMenu
            className="dupa"
            id="options-menu-single-option-example"
            menuItems={menuItems}
            isOpen={isOpen}
            toggle={toggle} />
    );
}

interface GroupingItem{
    value:string,
    disabled:boolean,
    isPlaceholder?:boolean
}

const Grouping = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<string>("");
    const [isDisabled, setIsDisabled] = React.useState<boolean>(false);


    const onToggle = () => {
        setIsOpen(!isOpen);
    }

    const onSelect = (event, selection, isPlaceholder) => {
        if (isPlaceholder) clearSelection();
        else {
            
            setSelected(selection);
            setIsOpen(false);

            console.log('selected:', selection);
        }
    };

    const clearSelection = () => {
        setSelected("");
        setIsOpen(false);
    };

    const options:GroupingItem[] = [
        { value: 'Mr', disabled: false },
        { value: 'Miss', disabled: false },
        { value: 'Mrs', disabled: false },
        { value: 'Ms', disabled: false },
        { value: 'Dr', disabled: false },
        { value: 'Other', disabled: false },
        { value: 'No Grouping', disabled: false, isPlaceholder:true }
    ];


    return (
        <Select
            variant={SelectVariant.single}
            placeholderText="No Grouping"
            aria-label="Select Input with descriptions"
            onToggle={onToggle}
            onSelect={onSelect}
            selections={selected}
            isOpen={isOpen}
            aria-labelledby='select-descriptions-title'
            isDisabled={isDisabled}
        >
            {options.map((option, index) => (
                <SelectOption
                    isDisabled={option.disabled}
                    key={index}
                    value={option.value}
                    isPlaceholder={option.isPlaceholder}
                    description="This is a description"
                />
            ))}
        </Select>
    );

}

interface TableProps<TItem>{
    columns: { key:string, value:string }[],
    items: TItem[], 
    onItemSelected: (id:string) => void       
}


export function TableView<TItem>(props: TableProps<TItem>)
{
    const [selectedDataListItemId, setSelectedDataListItemId] = React.useState<string>("");
    
    const onSelectDataListItem = (id:string) => {
        setSelectedDataListItemId(id);
        props.onItemSelected(id);
    };

    function renderItem<TItem>(item : TItem, columnMap: {key: string, value:string})
    {
        return <DataListCell key={columnMap.value}>{item[columnMap.value]}</DataListCell>
    }

    return (  <DataList aria-label="Simple data list example" selectedDataListItemId={selectedDataListItemId} onSelectDataListItem={onSelectDataListItem}>
    <DataListItem aria-labelledby="simple-item1">
      <DataListItemRow>
      <DataListItemCells dataListCells=
            { props.columns.map(column=> <DataListCell key={column.value}>{column.key}</DataListCell> ) }>
        </DataListItemCells>        
      </DataListItemRow>
    </DataListItem>
  
    {props.items.map((element,index)=><DataListItem key={index} id={index.toString()}>
    <DataListItemRow>
        <DataListItemCells
          dataListCells={ [props.columns.map(item => renderItem(element, item))] }
        />
      </DataListItemRow>
    
    </DataListItem>) }

  </DataList>);
}


const DataGrid = (props: { columns : string[], applicattionPools:ApplicationPool[]}) => {

    const [selectedDataListItemId, setSelectedDataListItemId] = React.useState<string>("");

    const onSelectDataListItem = id => {
        setSelectedDataListItemId(id);
    };

    return (  <DataList aria-label="Simple data list example"   selectedDataListItemId={selectedDataListItemId} onSelectDataListItem={onSelectDataListItem}>
    <DataListItem aria-labelledby="simple-item1">
      <DataListItemRow>
      <DataListItemCells dataListCells=
            { props.columns.map(column=> <DataListCell key={column}>{column}</DataListCell> ) }>
        </DataListItemCells>        
      </DataListItemRow>
    </DataListItem>
  
    {props.applicattionPools.map((element,index)=><DataListItem key={index} id={index.toString()}>
    <DataListItemRow>
        <DataListItemCells
          dataListCells={[
            <DataListCell key={element.name}>{element.name}</DataListCell>,
             <DataListCell key={element.identity}>{element.identity}</DataListCell>,
            <DataListCell key={element.managedPipeLineMode}>{element.managedPipeLineMode}</DataListCell>,
            <DataListCell key={element.netCLRVersion}>{element.netCLRVersion}</DataListCell>,
            <DataListCell key={element.status}>{element.status}</DataListCell>,
            <DataListCell key={element.applications}>{element.applications}</DataListCell>,
          ]}
        />
      </DataListItemRow>
    
    </DataListItem>) }

  </DataList>);
};


export { ApplicationPools };