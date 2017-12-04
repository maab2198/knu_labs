data<-MASS::cats

print(data)
#Усы
sex <- table(data[1])
print(sex)
barplot(sex,col=c("pink","lightblue"),horiz=T , las=1)
#Усы
boxplot(data$Bwt,col=rgb(111,145,202,maxColorValue = 255), ylab="value" , xlab="Body weight(kg)" )
boxplot(data$Hwt,col=rgb(0.3,0.2,0.5,0.6), ylab="value", xlab="Heart weight(g)"  )

#tab<-table(c("BWh"),c("Hwh"))


#Summary
mat <- matrix(sapply(data[2:3], min),ncol=2,byrow=TRUE)

colnames(mat) <- c("Bwh", "Hwt")
mat <- as.table(mat)

mat<-rbind(mat, sapply(data[2:3], max)) 
mat<-rbind(mat, sapply(data[2:3], sd))#стандартное отклонение
mat<-rbind(mat, sapply(data[2:3], var))#дисперия
mat<-rbind(mat, sapply(data[2:3], IQR))#межквдратный размах
mat<-rbind(mat, sapply(data[2:3], mean))#середнє
mat<-rbind(mat, sapply(data[2:3], median))
mat<-rbind(mat, sapply(data[2:3], quantile))

rownames(mat) <- c("Min", "Max","Sd","D","IQR","Mean","Median","0%","25%","50%","75%","100%")
print(mat)


#график плотности распределения
plot(density(data$Bwt, adjust=2)) #adjust >> гладкость
rug(data$Bwt)#места с наиболее высокой плотностью

plot(density(data$Hwt, adjust=2))
rug(data$Hwt)
#Коеф Пирсона
cor.test(data$Bwt,data$Hwt) 


#линейная регрессия
model <- lm(data$Bwt ~ data$Hwt ) #строим 
summary(model)
plot(data$Bwt~data$Hwt, xlab="Body weight", ylab="Heart weight")
abline(model)

qqnorm(data$Hwt,main = "Normal Q-Q Plot Heart weight(g)",
       xlab = "Theoretical Quantiles", ylab = "Heart weight(g)"); 
qqline(data$Hwt, col=2);

qqnorm(data$Bwt,main = "Normal Q-Q Plot Body weight(kg)",
       xlab = "Theoretical Quantiles", ylab = "Body weight(kg)"); 
qqline(data$Bwt, col=2);

#Грабс
for (i in 1:3){
  outliers::grubbs.test(data$Hwt, type = 10, opposite = FALSE, two.sided = FALSE)
  data$Hwt<-outliers::rm.outlier(data$Hwt, fill = TRUE, median = TRUE, opposite = FALSE)
  boxplot(data$Hwt,col=rgb(0.3,0.2,0.5,0.6), ylab="value", xlab="Heart weight(g)"  )
}

library(ggplot2)


# Grouped
ggplot(data, aes(fill=Sex, y=Hwt, x=Bwt)) + 
  geom_bar( stat="identity")

