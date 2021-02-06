import React, { useState, useCallback } from 'react'
import DataTable from 'react-data-table-component'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function PageAntibody () {
    const [antibodyList, setantibodyList] = useState([{"antibody":"bag","ID":"1"},{"antibody":"aaa","ID":"2"}])
    const [modalShow, setModalShow] = useState(false)
    const [modal, setModal] = useState({"antibody":"","ID":""})
    const [antibody, setantibody] = useState("")
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
        setModal({"antibody":"","ID":""})
    }

    const deleteModal = () => {
        updateTableCallback()
    }

    const save = () => {
        updateTableCallback()
    }


    const columns = [
        {
            name: "Antibody",
            selector: 'antibody'
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

    const AntibodyTable = (props) => {
        const filteredItems = props.antibodyList.filter(item =>
            (
                item.antibody && item.antibody.toLowerCase().includes(props.searchFilter.toLowerCase())
            )    
        )

        return(
            props.antibodyList.length > 0 &&
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
                    <h1 className="QC">Antibody Management</h1>
                </div>
            </div>
            <div className="contentpanel">
                <div className="row" style={{margin:'10px 0px 35px 0px'}}>
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
                                        <input type="text" className="form-control" placeholder="Search" onKeyUp={(e) => {setFilter(e.target.value)}}/>
                                        <button type="button" className="btn btn-default" style={{marginLeft:'5px'}} onClick={addModal} >Add</button>
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
                                <AntibodyTable 
                                    columns={columns}
                                    antibodyList={antibodyList}
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
                                                    <label htmlFor="status" className="col-sm-4 control-label">Antibody</label>
                                                    <div className="col-lg-8 col-md-8 col-sm-8">
                                                        <input type="text" className="form-control" onKeyUp={(e) => { setantibody(e.target.value); }} placeholder="antibody" defaultValue={modal.antibody} />
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

export default React.memo(PageAntibody)