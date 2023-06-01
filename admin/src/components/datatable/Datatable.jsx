import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import axios from "axios";

const Datatable = ({ columns }) => {
  const [list, setList] = useState([]);
  const { data } = useFetch("http://localhost:8800/api/news/");

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/news/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Ações",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/news/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Ver</div>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Excluir
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Notícias
        <Link to="/news/new" className="link">
          Adicionar notícia
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
