package com.ledo.im.web.controller;

import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ledo.im.model.IMUser;
import com.ledo.im.service.ImUserService;
import com.ledo.im.util.Page;

@RestController
@RequestMapping("/user")
public class IMUserController {
	private static 	Logger LOG= LoggerFactory.getLogger(IMUserController.class);	
	@Autowired
	private ImUserService imUserService;
	@RequestMapping(value="/show" )
//	@ResponseStatus(HttpStatus.)
	public Page<IMUser>  show(@RequestBody Page<IMUser> param){
//		List<IMUser> users = imUserService.listUsers(pageNum, pageSize);	
		Page<IMUser> page = imUserService.queryWithPageByCondition(param);
//		ret.put("users", users);
 		return page;
	}
	
	 
    @RequestMapping(method = POST)
    @ResponseStatus(HttpStatus.CREATED)
    public int createUser(@RequestBody @Valid IMUser user) {
    	user.setId(null);
        return imUserService.saveUser(user);
    }
    
    @RequestMapping(value = "/{id}", method = PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)      
    public int updateUser(@PathVariable Integer id, @RequestBody @Valid IMUser user) {
    	user.setId(id);
        return imUserService.saveUser(user); 
    } 
    @RequestMapping(value = "/{uname}", method =RequestMethod.GET )
    @ResponseStatus(HttpStatus.ACCEPTED)      
    public boolean checkUname(@PathVariable String  uname) {
    	return imUserService.checkUname(uname); 
    } 
    @RequestMapping(value = "/get/{id}", method =RequestMethod.GET )
    @ResponseStatus(HttpStatus.ACCEPTED)      
    public IMUser getUser(@PathVariable Integer  id) {
    	return imUserService.selectUserById(id); 
    } 
    
    @RequestMapping("/login")
    public IMUser login(@RequestBody @Valid IMUser user){
    	LOG .info("user login ");
    return 	  imUserService.login(user);
    }
    @RequestMapping("/logout")
    public long logout(@RequestBody @Valid IMUser user){
    	
    	return 	  imUserService.logout(user);
    }
    
}
