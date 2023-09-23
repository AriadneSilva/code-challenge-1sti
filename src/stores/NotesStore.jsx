import React, { createContext, useEffect, useState } from "react";

import get from "lodash.get";

// //API
// import main from '../api/main'

// //COMPONENTS
import { LoadingOverlay } from "../components/LoadingOverlay";

import { ListNotes } from "../containers/ListNotes";
// //UTILS
// import moment from 'moment'
// import _ from 'lodash'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const NotesContext = createContext();
export const NotesProvider = ({ children }) => {
  const navigate = useNavigate();

  //STATES
  //Customer information
  // const [customerList, setCustomerList] = useState(null)
  // const [customerObj, setCustomerObj] = useState({
  //     rg: null,
  //     dataEmissao: null,
  //     orgaoExpedidor: null,
  //     sexo: null
  // })
  // const [selectedCustomer, setSelectedCustomer] = useState(null)

  //State controllers
  // const [isEditing, setIsEditing] = useState(false)
  // const [startValidation, setStartValidation] = useState(false)
  const [isLoading, setLoading] = useState(false);
  // const [validForm, setValidForm] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const tabOptions = [
    {
      label: "All",
      content: <ListNotes />,
    },
    {
      label: "Home",
      content: <div>Mostrar notas de home</div>,
      color: "#FF9100",
    },
    {
      label: "Work",
      content: <div>Mostrar notas de work</div>,
      color: "#5C6BC0",
    },
    {
      label: "Personal",
      content: <div>Mostrar notas de personal</div>,
      color: "#66BB6A",
    },
  ];

  const noteOptions = [
    {
      value: 0,
      label: "Select Category",
      disabled: true,
    },
    {
      value: 1,
      label: "Home",
    },
    {
      value: 2,
      label: "Work",
    },
    {
      value: 3,
      label: "Personal",
    },
  ];

  const [notesObj, setNotesObj] = useState({
    id: null,
    title: null,
    category: null,
    description: null,
    date: null,
    read: false,
  });

  const [notesList, setNotesList] = useState([]);

  localStorage.setItem("notesList", JSON.stringify(notesList));

  //Backend data
  // const [orgaosExpedidoresList, setOrgaosExpedidoresList] = useState(null)

  //CUSTOMER MANAGEMENT METHODS
  const newNote = () => {
    setNotesObj({
      id: null,
      title: null,
      category: null,
      description: null,
      date: null,
      read: false,
    });
    // setIsEditing(false)
    // setStartValidation(false)
    navigate("/");
  };

  // const onEditCustomer = (customer) => {
  //     setIsEditing(true)
  //     setCustomerObj({ ...customer })
  //     navigate("/")
  // }

  // const onConfirmDeleteCustomer = (customer) => {
  //     setSelectedCustomer(customer)
  //     setShowModal("confirmDeleteCustomer")
  // }

  // const onCancelDeleteCustomer = () => {
  //     setSelectedCustomer(null)
  //     setShowModal(false)
  // }

  // //BACKEND REQUESTS
  // const submitForm = () => new Promise((resolve, reject) => {
  //     if (!startValidation) {
  //         setStartValidation(true)
  //     }

  //     if (validForm) {
  //         setLoading(true)
  //         if (isEditing) {
  //             main.updateCustomer(customerObj).then(data => {
  //                 toast.success(data.message)
  //                 setStartValidation(false)
  //                 resolve()
  //             }).catch(error => {
  //                 toast.error(error)
  //                 reject(error)
  //             }).finally(() => {
  //                 setLoading(false)
  //             })
  //         }
  //         else {
  //             main.addCustomer(customerObj).then(data => {
  //                 toast.success(data.message)
  //                 setStartValidation(false)
  //                 setCustomerObj({
  //                     rg: null,
  //                     dataEmissao: null,
  //                     orgaoExpedidor: null,
  //                     sexo: null
  //                 })
  //                 resolve()
  //             }).catch(error => {
  //                 toast.error(error)
  //                 reject(error)
  //             }).finally(() => {
  //                 setLoading(false)
  //             })
  //         }
  //     }
  // })

  const addNote = () => {
    console.log(
      "Minha lista antes",
      notesList,
      "meu objeto de agora",
      notesObj
    );
    setNotesList([...notesList, notesObj]);
    console.log(
      "Minha lista depois",
      notesList,
      "meu objeto de agora",
      notesObj
    );
  };

  console.log("Como tá minha lista: ", notesList);

  // const deleteCustomer = (customer) => new Promise((resolve, reject) => {
  //     setLoading(true)
  //     main.deleteCustomer(customer).then(data => {
  //         getCustomers()
  //         setShowModal(false)
  //         toast.success(data.message)
  //         resolve()
  //     }).catch(error => {
  //         toast.error(error)
  //         reject(error)
  //     }).finally(() => {
  //         setLoading(false)
  //     })
  // })

  // const getCustomers = () => new Promise((resolve, reject) => {
  //     setLoading(true)
  //     main.getCustomers().then(data => {
  //         setCustomerList(_.map(data, d => {
  //             return {
  //                 ...d,
  //                 sexo: _.toUpper(d.sexo).indexOf("FEMALE") >= 0 ? "F" : "M",
  //                 dataEmissao: moment(d.dataEmissao).format("yyyy-MM-DD"),
  //                 orgaoExpedidor: _.sample(_.reject(orgaosExpedidoresList.orgao_emissor, o => o.value === "")).value
  //             }
  //         }))
  //         navigate("/list")
  //         resolve()
  //     }).catch(error => {
  //         toast.error(error)
  //         reject(error)
  //     }).finally(() => {
  //         setLoading(false)
  //     })
  // })

  // const getOrgaosExpedidores = () => new Promise((resolve, reject) => {
  //     setLoading(true)
  //     main.getOrgaosExpedidores().then(data => {
  //         setOrgaosExpedidoresList(data[0])
  //         resolve()
  //     }).catch(error => {
  //         toast.error(error)
  //         reject(error)
  //     }).finally(() => {
  //         setLoading(false)
  //     })
  // })

  // //USE EFFECT HOOKS
  // useEffect(() => {
  //     const hydrate = async () => {
  //         try {
  //             console.log("orgaosExpedidoresList", orgaosExpedidoresList)
  //             !orgaosExpedidoresList && await getOrgaosExpedidores()
  //         }
  //         catch (e) {
  //             toast.error(e)
  //         }
  //     }
  //     hydrate()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])

  // useEffect(() => {
  //     const emptyFields = _.values(customerObj).some(info => info === null)
  //     setValidForm(!emptyFields)
  // }, [customerObj])

  const renderStore = isLoading ? (
    <LoadingOverlay visible={true} />
  ) : (
    <NotesContext.Provider
      value={{
        notesObj,
        setNotesObj,
        showModal,
        setShowModal,
        tabOptions,
        noteOptions,
        addNote,
        notesList,
        newNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );

  return renderStore;
};
