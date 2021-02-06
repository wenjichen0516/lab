import React, { useState, useCallback } from 'react'
import DataTable from 'react-data-table-component'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function PageAssayType () {
    const [AssayTypeList, setAssayTypeList] = useState([{"AssayType":"atawt","ID":"1"},{"AssayType":"awta","ID":"2"}])
    const [modalShow, setModalShow] = useState(false)
    const [modal, setModal] = useState({"AssayType":"","ID":""})
    const [AssayType, setAssayType] = useState("")
    const customStyles = {
        content: {
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '60%'
        }
    }
    const closeModal = () => {
        setModalShow(false);
    }

    const addModal = () => {
        setModalShow(true);
        setModal({"AssayType":"","ID":""})
    }

    const deleteModal = () => {
        updateTableCallback()
    }

    const save = () => {
        updateTableCallback()
    }

    const columns = [
        {
            name: "AssayType",
            selector: 'AssayType'
        },
        {
            name: '',
            cell: (c) => {
               return (
                 <button onClick={() => { 
                    setModalShow(true)
                    setModal(c)
                    }}
                   className="btn btn-default">Edit</button>
                 )
              }
         },
         {
            name: '',
            cell: (c) => {
               return (
                 <button onClick={deleteModal
                    }
                   className="btn btn-default">Delete</button>
                 )
              }
         }
    ]
    const [filter, setFilter] = useState("")

    const updateTableCallback = useCallback( () => {}, [])

    const AssayTypeTable = (props) => {
        const filteredItems = props.AssayTypeList.filter(item =>
            (
                item.AssayType && item.AssayType.toLowerCase().includes(props.searchFilter.toLowerCase())
            )    
        )

        return(
            props.AssayTypeList.length > 0 &&
            <DataTable 
                className="table table-bordered table-primary no-footer"
                noHeader={true}
                columns={props.columns}
                data={filteredItems}
                highlightOnHover
                pagination={true}
                wrap={true}
                paginationRowsPerPageOptions={[10, 20, 40, 50, 100, 200, 1000]}
            />
        )
    }

    return (
        <div className="mainpanel" style={{ marginLeft: '5px' }}>
            <div className="row">
                <div className="pageheader">
                    <h1 className="QC">Assay Type Management</h1>
                </div>
            </div>
            <div className="contentpanel">
                <div className="row" style={{margin:'20px 0px 35px 0px'}}>
                    <div className="col-md-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <div className="panel-title">
                                    <div><span></span></div>
                                </div>
                            </div>
                            <div className="panel-body" data-ng-init="Show()">
                                <form className="form-inline">
                                    <div className="form-group">
                                        <label>Search</label>
                                        <input type="text" className="form-control" style={{marginLeft:'5px'}} placeholder="Search" onKeyUp={(e) => {setFilter(e.target.value)}}/>
                                        <button type="button" className="btn btn-default" onClick={addModal} >Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{margin:'10px 0px 35px 0px'}}>
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-body table-responsive">
                                <AssayTypeTable 
                                    columns={columns}
                                    AssayTypeList={AssayTypeList}
                                    searchFilter={filter}
                                />
                                <Modal
                                    isOpen={modalShow}
                                    style={customStyles}
                                    contentLabel=""       
                                >
                                    <div className="panel">
                                        <button type="button" onClick={closeModal} className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <div className="panel-heading">
                                        </div>
                                        <div className="panel-body">
                                            <div className="form-horizontal">
                                                <div className="form-group">
                                                    <label htmlFor="status" className="col-sm-4 control-label">Assay Type</label>
                                                    <div className="col-lg-8 col-md-8 col-sm-8">
                                                        <input type="text" className="form-control" onKeyUp={(e) => { setAssayType(e.target.value); }} placeholder="AssayType" defaultValue={modal.AssayType} />
                                                    </div>
                                                </div>  
                                            
                                            </div>
                                        </div>
                                    
                                        <div className="panel-footer">
                                            <div className="row">
                                                <div className="col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-12">
                                                    <button type="button" className="btn btn-default" onClick={closeModal} >Cancel</button>
                                                </div>
                                                <div className="col-lg-2 col-md-3 col-sm-12">
                                                    <button className="btn btn-primary" onClick={save}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>           
                </div>
            </div>
            
        </div>
    )
}

export default React.memo(PageAssayType)