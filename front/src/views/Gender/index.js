import React, { useState, useCallback } from 'react'
import DataTable from 'react-data-table-component'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function PageGender () {
    const [genderList, setGenderList] = useState([{"Gender":"Male","ID":"1"},{"Gender":"Female","ID":"2"}])
    const [modalShow, setModalShow] = useState(false)
    const [modal, setModal] = useState({"Gender":"","ID":""})
    const [gender, setGender] = useState("")
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
        setModal({"Gender":"","ID":""})
    }

    const deleteModal = () => {
        updateTableCallback()
    }

    const save = () => {
        updateTableCallback()
    }

    const columns = [
        {
            name: "Gender",
            selector: 'Gender'
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

    const GenderTable = (props) => {
        const filteredItems = props.genderList.filter(item =>
            (
                item.Gender && item.Gender.toLowerCase().includes(props.searchFilter.toLowerCase())
            )    
        )

        return(
            props.genderList.length > 0 &&
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
                    <h1 className="QC">Gender Management</h1>
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
                                <GenderTable 
                                    columns={columns}
                                    genderList={genderList}
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
                                                    <label htmlFor="status" className="col-sm-4 control-label">Gender</label>
                                                    <div className="col-lg-8 col-md-8 col-sm-8">
                                                        <input type="text" className="form-control" onKeyUp={(e) => { setGender(e.target.value); }} placeholder="Gender" defaultValue={modal.Gender} />
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

export default React.memo(PageGender)