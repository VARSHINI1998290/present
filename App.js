import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [tableContent, setTableContent] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios
			.get("http://timeapi.kaaylabs.com/api/v1/project_view/")
			.then((res) => setTableContent(res.data.data))
			.catch((e) => console.log(e));
	}, []);

	const statusValues = [...new Set(tableContent.map((item) => item.status))];
	return (
		<>
			<label for="search">Search By Status</label>
			<select
				name="search"
				id="search"
				style={{ margin: "50px" }}
				onChange={(e) => setSearch(e.target.value)}
			>
				<option value="">All</option>
				{statusValues.map((status) => (
					<option value={status}>{status}</option>
				))}
			</select>
			<table>
				<tr>
					<th>Project ID</th>
					<th>Project Code</th>
					<th>Description</th>
					<th>Start Date</th>
					<th>End Date</th>
					<th>Status</th>
				</tr>
				{search
					? tableContent
							.filter((item) => item.status === search)
							.map((item) => (
								<tr>
									<td>{item.project_id}</td>
									<td>{item.project_code}</td>
									<td>{item.description}</td>
									<td>{item.start_date}</td>
									<td>{item.end_date}</td>
									<td>{item.status}</td>
								</tr>
							))
					: tableContent.map((item) => (
							<tr>
								<td>{item.project_id}</td>
								<td>{item.project_code}</td>
								<td>{item.description}</td>
								<td>{item.start_date}</td>
								<td>{item.end_date}</td>
								<td>{item.status}</td>
							</tr>
					  ))}
			</table>
		</>
	);
}

export default App;
