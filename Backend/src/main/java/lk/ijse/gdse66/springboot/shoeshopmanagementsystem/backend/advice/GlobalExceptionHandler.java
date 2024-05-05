package lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.advice;

import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.NotFoundException;
import lk.ijse.gdse66.springboot.shoeshopmanagementsystem.backend.service.exception.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<Map<String, Object>> handleServiceException(ServiceException exception) {
        Map<String, Object> errorAttribute;
        if(exception instanceof DuplicateRecordException) {
            errorAttribute = getCommonErrorAttribute(HttpStatus.CONFLICT);
        }else if (exception instanceof NotFoundException) {
            errorAttribute = getCommonErrorAttribute(HttpStatus.NOT_FOUND);
        }else{
            errorAttribute = getCommonErrorAttribute(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        errorAttribute.put("message",exception.getMessage());
        return new ResponseEntity<>(errorAttribute, HttpStatus.valueOf((Integer) errorAttribute.get("code")));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,Object> handleDataValidationException(MethodArgumentNotValidException exp){
        Map<String, Object> errorAttribute = getCommonErrorAttribute(HttpStatus.BAD_REQUEST);
        ArrayList<Map<String,Object>> errorList = new ArrayList<>();

        for (FieldError fieldError : exp.getFieldErrors()) {
            LinkedHashMap<String, Object> errorMap = new LinkedHashMap<>();
            errorMap.put("field",fieldError.getField());
            errorMap.put("message",fieldError.getDefaultMessage());
            errorMap.put("rejected", fieldError.getRejectedValue());

            errorList.add(errorMap);
        }
        errorAttribute.put("message", "Data Validation Failed");
        errorAttribute.put("errors", errorList);

        return errorAttribute;
    }

    private Map<String, Object> getCommonErrorAttribute(HttpStatus httpStatus) {
        LinkedHashMap<String, Object> errorAttribute = new LinkedHashMap<>();
        errorAttribute.put("code", httpStatus.value());
        errorAttribute.put("status", httpStatus);
        return errorAttribute;
    }
}
