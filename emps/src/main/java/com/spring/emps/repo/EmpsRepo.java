package com.spring.emps.repo;

import com.spring.emps.model.EmpsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EmpsRepo{
    private final JdbcTemplate jb;
    public EmpsRepo(JdbcTemplate jb)
    {
        this.jb=jb;
    }
    private static final RowMapper<EmpsModel> empsRowMapper=(rs, rowNum)->{
        EmpsModel emp=new EmpsModel();
        emp.setEmp_id(rs.getInt("emp_id"));
        emp.setEmp_name(rs.getString("emp_name"));
        emp.setEmp_dept(rs.getString("emp_dept"));
        emp.setEmp_job(rs.getString("emp_job"));
        emp.setEmp_salary(rs.getLong("emp_salary"));
        emp.setEmp_email(rs.getString("emp_email"));
        return emp;
    };
    public List<EmpsModel> findAll()
    {
        String sql="select * from employee_details";
        return jb.query(sql,empsRowMapper);
    }
    public Optional<EmpsModel> findById(int id)
    {
        String sql="select * from employee_details where emp_id=?";
        List<EmpsModel>emps=jb.query(sql,empsRowMapper,id);
        return emps.size()>0 ?Optional.of(emps.get(0)) :Optional.empty();
    }
    public EmpsModel save(EmpsModel emp)
    {
        String sql;
        if(emp.getEmp_id()==0)
        {
            sql="INSERT INTO employee_details (emp_id,emp_name, emp_dept, emp_job, " +
                    "emp_salary, emp_email) VALUES (emp_id_seq.NEXTVAL,?, ?, ?, ?, ?)";
            jb.update(sql,emp.getEmp_name(),emp.getEmp_dept(),emp.getEmp_job()
                    ,emp.getEmp_salary(),emp.getEmp_email());
            String fetchSql = "SELECT * FROM employee_details WHERE emp_name = ? AND emp_email = ?";
            List<EmpsModel> emps = jb.query(fetchSql, empsRowMapper, emp.getEmp_name(), emp.getEmp_email());
            return emps.isEmpty() ? null : emps.get(0);
        }
        else {
            sql="update employee_details set emp_name=?,emp_dept=?,emp_job=?,emp_salary=? ,emp_email=? where emp_id=?";
            jb.update(sql,emp.getEmp_name(),emp.getEmp_dept(),emp.getEmp_job()
                    ,emp.getEmp_salary(),emp.getEmp_email(),emp.getEmp_id());

            String fetchSql = "SELECT * FROM employee_details WHERE emp_id = ?";
            List<EmpsModel> emps = jb.query(fetchSql, empsRowMapper, emp.getEmp_id());
            return emps.isEmpty() ? null : emps.get(0);

        }
    }
    public String deleteById(int id)
    {
        String fetchSql = "SELECT * FROM employee_details WHERE emp_id = ?";
        List<EmpsModel> emps = jb.query(fetchSql, empsRowMapper, id);

        if (emps.isEmpty()) {
            return "Employee with ID " + id + " not found";
        }
        String sql="delete from employee_details where emp_id=?";
        return jb.update(sql,id)+"Deleted employee details with emp_id="+id;
    }
    public boolean existsById(int id)
    {
        String sql="select count(*) from employee_details where emp_id=?";
        int count=jb.queryForObject(sql,Integer.class,id);
        return count>0;
    }

}
