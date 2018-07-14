package com.ledo.im.service;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.github.pagehelper.PageHelper;
import com.ledo.im.util.Page;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
public  abstract class CommonService<T>  {

    @Autowired
    protected Mapper<T> mapper;

    public int save(T entity){
        return mapper.insert(entity);
    }

    public int delete(T entity){
        return mapper.deleteByPrimaryKey(entity);
    }
    
    public T selectById(Integer id){
    	return  mapper.selectByPrimaryKey(id);
    }

    /**
     * 单表分页查询
     * 
     * @param pageNum
     * @param pageSize
     * @return
     */
    public List<T> selectPage(int pageNum,int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        return mapper.select(null);
    }
    
    
    public List<T> selectPageByExample(int pageNum,int pageSize,Example example){
        PageHelper.startPage(pageNum, pageSize);
        return mapper.selectByExample(example);
    }
    
    /**
     * 带条件分页查询   //待改进
     * @param param
     * @return
     */
	public  Page<T> queryWithPageByCondition(Page<T> param)  {
				 ParameterizedType pt = (ParameterizedType)this.getClass().getGenericSuperclass();
		Class<?>  clazz = (Class<T>) pt.getActualTypeArguments()[0];
		 
//		int offset =(param.getPageNum()-1)*param.getPageSize();
//		int count = mapper.selectCount(null);
		Example example=  new Example(clazz);
		Map<String, Object> conditions = param.getConditions();
		
		Criteria criteria = example.createCriteria();
		if(conditions!=null&&!conditions.isEmpty()){
			for(Entry<String,Object> entrySet :  conditions.entrySet() ){
				if(!StringUtils.isEmpty(entrySet.getValue())){
					criteria.andEqualTo(entrySet.getKey(), entrySet.getValue());
				}
			}
		}
		if(!StringUtils.isEmpty(param.getOrderBy())){
			example.setOrderByClause(""+param.getOrderBy()+" desc");
		}
	com.github.pagehelper.Page<Object> page = PageHelper.startPage(param.getPageNum(), param.getPageSize(), true);
/*	    RowBounds bounds = new RowBounds(offset, param.getPageSize());
		List<T> list = mapper.selectByExampleAndRowBounds(example, bounds);*/
		List<T> list = mapper.selectByExample(example);
		param.setTotalNum((int) page.getTotal());
		param.setRecords(list);
		return	param;
	}
}